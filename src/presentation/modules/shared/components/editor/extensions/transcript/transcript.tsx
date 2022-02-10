import { useEffect, useRef, useState } from "react";
import { API, Storage } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import { generateJSON, JSONContent, NodeViewProps } from "@tiptap/react";
import { TranscriptContainer, TranscriptContent } from "./transcript.styles";
import { Highlights, Stories as Story } from "models";
import { useHighlight } from "./hooks/use-highlight";
import {
  EuiButton,
  EuiCard,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiLoadingSpinner,
  EuiPanel,
  EuiText,
  EuiTitle,
} from "@elastic/eui";
import ReactPlayer from "react-player";
import awsvideoconfig from "aws-video-exports";
import { VodAsset } from "models";
import { getVodAsset } from "graphql/queries";
import { createTranscription, updateVodAsset } from "graphql/mutations";
import {
  CreateTranscriptionInput,
  CreateTranscriptionMutation,
  GetVodAssetQuery,
  UpdateVodAssetInput,
  UpdateVodAssetMutation,
} from "API";
import { displayTranscript } from "./transcript-parser";
import { useParams } from "react-router-dom";
import TimeOffset from "../time-offset";
import { CustomParagraph } from "../../editor";
import { atom, useRecoilState } from "recoil";
import {
  HighlightState,
  highlightAtom,
} from "../../components/highlight-control/highlight-control";
import { useVideoUpload } from "../../../transcript/hooks/use-video-upload";
import {
  useUpdateVideoAsset,
  useVideoAsset,
} from "core/modules/videoAssets/hooks";
import { useCreateTranscription } from "core/modules/transcripts/hooks";
import { Transcription } from "models";
import { TranscriptionStatus } from "models";
import { useStory, useUpdateStory } from "core/modules/stories/hooks";
import {
  Annotation,
  annotationState,
} from "main/pages/make-story-details-page";
import { useHighlights } from "core/modules/highlights/hooks";
import { useTags } from "core/modules/tags/hooks";
import _ from "lodash";

export const transcriptAtom = atom<JSONContent | undefined>({
  key: "transcriptState",
  default: undefined,
});

export const Transcript = (props: NodeViewProps) => {
  const { id } = useParams() as { id: string };
  const [transcript, setTranscript] = useRecoilState(transcriptAtom);
  const [highlightState, setHighlightState] = useRecoilState(highlightAtom);
  const { video } = props.node.attrs;
  const uploaderRef = useRef<HTMLInputElement>(null);
  const [token, setToken] = useState<string | null>();
  const [videoURL, setVideoURL] = useState<string | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [annotation, setAnnotation] = useRecoilState(annotationState);

  const [isAssitantActive, setIsAssistantActive] = useState<boolean>(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  const { data } = useVideoAsset(video);
  const { data: story } = useStory(id);
  const transcriptCreateMutation = useCreateTranscription();
  const videoAssetUpdateMutation = useUpdateVideoAsset();
  const storyUpdateMutation = useUpdateStory(id);
  const videoAsset = data as VodAsset;

  const { data: tags } = useTags(story?.projectsID, Boolean(story?.projectsID));
  const { data: highlights } = useHighlights(
    {
      transcriptId: videoAsset?.transcription?.id,
    },
    Boolean(videoAsset?.transcription?.id)
  );
  const handleVideoUploadSuccess = (videoAssetId: string) => {
    props.updateAttributes({
      video: videoAssetId,
    });
  };
  const { upload, progress } = useVideoUpload({
    onSuccess: handleVideoUploadSuccess,
  });

  useEffect(() => {
    if (!video) {
      uploaderRef.current?.click();
    }
  }, [video]);

  useEffect(() => {
    if (
      tags &&
      tags.length > 0 &&
      highlights &&
      highlights.length > 0 &&
      _.isEmpty(annotation)
    ) {
      const annotation = highlights.reduce<Annotation>(
        (acc, highlight: Highlights) => {
          const tagIds = highlight.tagIds?.split("|") || [];
          const selectedTags = tags.filter((tag) => tagIds.includes(tag.id));
          const annotationTags = selectedTags.map((tag) => {
            return {
              label: tag.label,
              id: tag.id,
            };
          });
          acc[highlight.id] = {
            type: highlight.type,
            tags: annotationTags,
          };
          return acc;
        },
        {}
      );
      setAnnotation(annotation);
    }
  }, [annotation, highlights, setAnnotation, tags]);
  useEffect(() => {
    async function fetchVideoUrl() {
      const { url } = await API.get(
        "assets",
        `/assets/${videoAsset?.video}`,
        {}
      );
      setVideoURL(url);
    }
    if (videoAsset?.video) {
      fetchVideoUrl();
    }
  }, [videoAsset?.video]);

  useEffect(() => {
    const fetchTranscriptJson = async (id: string) => {
      const key = `${id}.json`;
      const { url: transcriptJSONFile } = await API.get(
        "assets",
        `/assets/${key}`,
        {}
      );
      // const transcriptContentResponse = await fetch(result);
      //@ts-ignore
      const transcriptResponse = await fetch(transcriptJSONFile);
      const transcriptJson = await transcriptResponse.json();
      const transcriptHTML = displayTranscript(transcriptJson);
      return generateJSON(transcriptHTML, [
        Document,
        CustomParagraph,
        TimeOffset,
        Text,
      ]);
    };
    async function setupTranscriptJSON() {
      if (
        story &&
        videoAsset?.transcription &&
        props.node.content &&
        props.node.content.size === 0 &&
        videoAsset?.transcription?.status === TranscriptionStatus.COMPLETED &&
        !isProcessing
      ) {
        const transcriptJson = await fetchTranscriptJson(
          videoAsset?.transcription.id
        );
        let doc = Object.assign({}, story?.content as unknown as JSONContent);
        if (doc.content) {
          let index = doc.content.findIndex(
            (content) => content.type === "transcriptComponent"
          );
          if (index && index >= 0) {
            let doc = story?.content as unknown as JSONContent;
            const currentValue = doc!!.content!![index];
            await storyUpdateMutation.mutateAsync({
              id: story.id,
              content: JSON.stringify({
                type: "doc",
                content: Object.assign([], doc.content, {
                  [index]: { ...currentValue, content: transcriptJson.content },
                }),
              }),
              _version: story._version,
            });
          }
        }
        setIsProcessing(false);
      }
    }
    if (!isProcessing) {
      setupTranscriptJSON();
      setIsProcessing(true);
    }
  }, [
    isProcessing,
    props.node.content,
    story,
    storyUpdateMutation,
    transcript,
    videoAsset?.transcription,
  ]);

  useEffect(() => {
    setHighlightState({
      transcriptionId: videoAsset?.transcription?.id,
    } as HighlightState);
  }, [setHighlightState, videoAsset?.transcription?.id]);

  useEffect(() => {
    const transcriptId = videoAsset?.transcription?.id;
    if (transcriptId) {
      //gethighlights
    }
  }, [videoAsset?.transcription?.id]);
  // useEffect(() => {
  //   async function fetchVideoURL() {
  //     const videoAssetResponse = (await API.graphql({
  //       query: getVodAsset,
  //       variables: { id: video.split(".")[0] },
  //       authMode: "AMAZON_COGNITO_USER_POOLS",
  //     })) as { data: GetVodAssetQuery };
  //     const videoAsset = videoAssetResponse.data?.getVodAsset;
  //     setVideoAsset(videoAsset as unknown as VodAsset);

  //     if (
  //       props.node.content &&
  //       props.node.content.size === 0 &&
  //       videoAsset?.transcription?.status === TranscriptionStatus.COMPLETED
  //     ) {
  //       const key = `${videoAsset?.transcription.id}.json`;
  //       const result = await Storage.get(key, {
  //         level: "public",
  //         download: true,
  //       });
  //       // const transcriptContentResponse = await fetch(result);
  //       //@ts-ignore
  //       const transcriptResponse = await new Response(result.Body).json();
  //       const resultX = displayTranscript(transcriptResponse);
  //       //update the transcript component
  //       const content = generateJSON(resultX, [
  //         Document,
  //         CustomParagraph,
  //         TimeOffset,
  //         Text,
  //       ]);
  //       const story = await DataStore.query(Story, id);
  //       if (story && Array.isArray(story.content)) {
  //         const fixedSchema = Story.copyOf(story, (updated) => {
  //           //@ts-ignore
  //           updated.content = {
  //             type: "doc",
  //             content: story.content as unknown as JSONContent[],
  //           };
  //         });
  //         await DataStore.save(fixedSchema);
  //       }
  //       if (story) {
  //         let doc = Object.assign({}, story?.content as unknown as JSONContent);
  //         if (doc.content) {
  //           let index = doc.content.findIndex(
  //             (content) => content.type === "transcriptComponent"
  //           );
  //           if (index && index >= 0) {
  //             const updatedStory = Story.copyOf(story, (updated) => {
  //               let doc = story?.content as unknown as JSONContent;
  //               const currentValue = doc!!.content!![index];
  //               // doc.content!![index].content = content.content as JSONContent[];
  //               //@ts-ignore
  //               updated.content = {
  //                 type: "doc",
  //                 content: Object.assign([], doc.content, {
  //                   [index]: { ...currentValue, content: content.content },
  //                 }),
  //               };
  //             });
  //             await DataStore.save(updatedStory);
  //             // doc.content[index].content = content.content as JSONContent[];
  //           }
  //         }
  //       }
  //       // doc.content.
  //     }
  //     const asset = videoAsset?.video;
  //     const isEncodingDone =
  //       new Date().valueOf() - new Date(videoAsset!!.updatedAt).valueOf() >
  //       60 * 1000;
  //     // awsOutputVideo + /assetID/ + assetID + extension + token
  //     if (isEncodingDone) {
  //       const uri = `https://${awsvideoconfig.awsOutputVideo}/${asset}/${asset}.m3u8`;

  //       setVideoURL(uri);
  //       setToken(token);
  //     }
  //   }
  //   if (video && !videoURL && !token) {
  //     fetchVideoURL();
  //   }
  // }, [token, video, videoURL]);

  const onAssistantClose = () => setIsAssistantActive(false);

  const handleClickOnContent = (e: MouseEvent) => {
    if (e.target instanceof Element && e.target.hasAttribute("data-hid")) {
      let range = document.createRange();
      const highlightId = e.target.getAttribute("data-hid");
      const highlightType = e.target.getAttribute("data-hc");
      var rootNode = e.target.parentNode;
      if (rootNode) {
        const selector = `span[data-hid="${highlightId}"]`;
        const items = rootNode.querySelectorAll(selector);
        range.setStart(items[0], 0);
        range.setEnd(items[items.length - 1], 1);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        setHighlightState({
          id: highlightId,
          type: highlightType,
          transcriptionId: videoAsset?.transcription?.id,
        } as HighlightState);
      }
      // props.editor.chain().focus().unsetHighlight().run();
      // let range = document.createRange();
      // range.selectNodeContents(e.target);
      // // const highlight = highlights[e.target.id];

      // // range.setStart(highlight.startNode, highlight.startOffset);
      // // range.setEnd(highlight.endNode, highlight.endOffset);
      // window.getSelection()?.removeAllRanges();
      // window.getSelection()?.addRange(range);
    }
  };

  /*
  TODO: 1. Trigger the transcription job?  
  SOLUTION: Create an entry in transcription table. A lambda function will listen to these change streams and then transcription job will be created in the lambda function.
  This function will only be triggered in case of new entries
  2. Show in progress state
  SOLUTION: When job is started then status will be changed to 'Enqueued', once the job is started status will be changed to 'INPROGRESS'
  3. Inject transcription when job succeeds
  SOLUTION: Once a new transcription is created in the s3 bucket then lambda will be trigged which will update the transcription table with the details.
  4. Render transcription appropriately
SOLUTION: Setup the subscription after starting the job so that once the status changes it is triggered and status is changed.


Unknowns:
1) Dynamodb change logs work as expected.
2) Differentiating new entries from updates in transcriber lambda
3) S3 trigger working as expected
4) Subscribing and unsubscribing on updateTranscriptions. It should only be triggered for the current transcription
  */
  const handleTranscription = async () => {
    //TODO: Check that transcription entry for the video shouldn't exist before hand.
    if (videoURL) {
      if (!videoAsset?.transcription) {
        //create a transcription entry
        const transcript = await transcriptCreateMutation.mutateAsync({
          video: videoAsset?.video,
          status: TranscriptionStatus.ENQUEUED,
        });
        //update reference in transcription
        await videoAssetUpdateMutation.mutateAsync({
          id: video,
          vodAssetTranscriptionId: transcript?.id,
        });
      }
      //update story
    } else throw new Error("No video to transcribe");
    // const doc = props.editor.getJSON();
    // const content = doc.content?.map((el) => {
    //   if (el.type === "transcriptComponent")
    //     return {
    //       ...el,
    //       content: data,
    //     };
    //   return el;
    // });

    // props.editor.commands.setContent({ ...doc, content });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files!![0];
    upload(file);
    // const ext = file.name.substring(file.name.lastIndexOf(".") + 1);
    // if (ext === "mp4") {
    //   Storage.configure({
    //     AWSS3: {
    //       bucket: awsvideoconfig.awsInputVideo,
    //       customPrefix: {
    //         public: "",
    //       },
    //     },
    //   });
    // }

    // const videoObject = (await API.graphql({
    //   query: createVideoObject,
    //   variables: {
    //     input: {},
    //   },
    //   authMode: "AMAZON_COGNITO_USER_POOLS",
    // })) as { data: CreateVideoObjectMutation };
    // const vodAsset = (await API.graphql({
    //   query: createVodAsset,
    //   variables: {
    //     input: {
    //       title: "Video title",
    //       description: "Video description",
    //       vodAssetVideoId: videoObject.data.createVideoObject?.id,
    //     } as CreateVodAssetInput,
    //   },
    //   authMode: "AMAZON_COGNITO_USER_POOLS",
    // })) as { data: CreateVodAssetMutation };
    // const key = `${videoObject.data?.createVideoObject?.id}.${ext}`;
    // Storage.put(key, file, {
    //   resumable: true,
    //   completeCallback: (event) => {
    //     //update key on p
    //     props.updateAttributes({
    //       video: vodAsset.data.createVodAsset?.id,
    //     });
    //   },
    //   progressCallback: (progress) => {
    //     setProgress(Math.round((progress.loaded / progress.total) * 100));
    //   },
    //   errorCallback: (err) => {
    //     console.error("Unexpected error while uploading", err);
    //   },
    // });
    // setProgress(10);
  };

  return (
    <TranscriptContainer>
      <EuiTitle>
        <h3>Transcript</h3>
      </EuiTitle>
      {/* <TranscriptAssistant
        isOpen={isAssitantActive}
        onClose={onAssistantClose}
      /> */}

      <EuiFieldText
        style={{ display: "none" }}
        type="file"
        inputRef={uploaderRef}
        accept="video/*"
        onChange={handleFileUpload}
      />

      {videoURL ? (
        <EuiPanel hasBorder hasShadow={false}>
          <EuiFlexGroup
            alignItems="center"
            direction="column"
            justifyContent="spaceAround"
          >
            <EuiFlexItem grow={false}>
              <ReactPlayer
                width={768}
                height={428}
                url={videoURL}
                // config={{
                //   file: {
                //     hlsOptions: {
                //       xhrSetup: function xhrSetup(xhr: any, url: string) {
                //         xhr.setRequestHeader(
                //           "Access-Control-Allow-Headers",
                //           "Content-Type, Accept, X-Requested-With"
                //         );
                //         // xhr.setRequestHeader(
                //         //   "Access-Control-Allow-Origin",
                //         //   "http://localhost:3000"
                //         // );
                //         xhr.setRequestHeader(
                //           "Access-Control-Allow-Credentials",
                //           "true"
                //         );
                //         xhr.open("GET", url + token);
                //       },
                //     },
                //   },
                // }}
                playbackRate={1.0}
                controls
                onError={(e) => console.log("onError", e)}
              />
            </EuiFlexItem>
            <EuiFlexItem>
              {videoAsset?.transcription ? (
                videoAsset.transcription.status ===
                TranscriptionStatus.INPROGRESS ? (
                  <EuiButton fullWidth={false} disabled isLoading>
                    Transcribing... {videoAsset.transcription.id}
                  </EuiButton>
                ) : null
              ) : (
                <EuiButton fullWidth={false} onClick={handleTranscription}>
                  Start Transcribing
                </EuiButton>
              )}
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPanel>
      ) : (
        <>
          {video && (
            <EuiCard
              icon={<EuiIcon size="xl" type="videoPlayer" />}
              title="Hey!"
              display="subdued"
              description="We are getting your video ready..."
            />
          )}
          {progress > 0 && (
            <EuiPanel color="subdued">
              <EuiText color="subdued">
                <EuiLoadingSpinner /> &nbsp; Upload in progress... {progress}%
              </EuiText>
            </EuiPanel>
          )}
        </>
      )}

      <TranscriptContent
        className="content"
        contentEditable={false}
        onClick={handleClickOnContent}
      />
    </TranscriptContainer>
  );
};

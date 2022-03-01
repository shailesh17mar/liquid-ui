class InteractiveTranscript {
  transcript: HTMLDivElement;
  wordArr: any;
  paras: HTMLCollectionOf<HTMLParagraphElement> | undefined;
  constructor() {
    //Assumption transcript must exist in the page
    this.transcript = document.querySelector(".node-transcriptComponent")!!;
    console.log(this.transcript);
    this.init = this.init.bind(this);
    this.createWordArray = this.createWordArray.bind(this);
    this.updateTranscriptVisualState =
      this.updateTranscriptVisualState.bind(this);
    if (this.transcript) {
      this.init();
    }
  }

  private init() {
    const words =
      this.transcript.querySelectorAll<HTMLSpanElement>("span[data-m]");

    this.wordArr = this.createWordArray(words);
    console.log(this.wordArr);

    this.paras = this.transcript.getElementsByTagName("p");
    console.log(this.paras);

    // this.paraIndex = 0;

    // words[0].classList.add("active");
    // this.paras[0].classList.add("active");

    // if (!isNaN(parseFloat(this.start))) {
    //   this.updateTranscriptVisualState(this.start);
    //   let index = indices.currentWordIndex;

    //   if (index > 0) {
    //     this.scrollToParagraph(indices.currentParaIndex, index);
    //   }
    // }

    // this.end = this.hashArray[1];

    //TODO convert to binary search for below for quicker startup

    // if (this.start && this.end) {
    //   for (let i = 1; i < words.length; i++) {
    //     const wordStart = parseInt(words[i].getAttribute("data-m")) / 1000;
    //     if (wordStart > this.start && this.end > wordStart) {
    //       words[i].classList.add("share-match");
    //     }
    //   }
    // }
  }

  updateTranscriptVisualState(currentTime: number) {
    let index = 0;
    let words = this.wordArr.length - 1;

    // Binary search https://en.wikipedia.org/wiki/Binary_search_algorithm
    while (index <= words) {
      const guessIndex = index + ((words - index) >> 1); // >> 1 has the effect of halving and rounding down
      const difference = this.wordArr[guessIndex].m / 1000 - currentTime; // wordArr[guessIndex].m represents start time of word

      if (difference < 0) {
        // comes before the element
        index = guessIndex + 1;
      } else if (difference > 0) {
        // comes after the element
        words = guessIndex - 1;
      } else {
        // equals the element
        index = guessIndex;
        break;
      }
    }

    console.log("testing", index);
    this.wordArr.forEach((word: any, i: number) => {
      //   let classList = word.n.classList;
      //   word.n.style.backgroundColor = "grey";
      if (i < index) {
        //   classList.add("read");
        //   classList.remove("unread");
        word.n.style.backgroundColor = "grey";
        //   classList.remove("active");
      } else {
        word.n.style.backgroundColor = "transparent";
        //   classList.add("unread");
        //   classList.remove("read");
      }
    });

    this.paras = this.transcript.getElementsByTagName("p");

    //remove active class from all paras

    // Array.from(this.paras).forEach((para) => {
    //   if (para.classList.contains("active")) {
    //     para.classList.remove("active");
    //   }
    // });

    // set current word and para to active

    if (index > 0) {
      this.wordArr[index - 1].n.style.backgroundColor = "yellow";
      //   this.wordArr[index - 1].n.classList.add("active");
      //   if (this.wordArr[index - 1].n.parentNode !== null) {
      //     this.wordArr[index - 1].n.parentNode.classList.add("active");
      //   }
      //   console.log(this.wordArr[index - 1].n.classList);
    }

    // Establish current paragraph index

    // let currentParaIndex;

    // Array.from(this.paras).every((para, i) => {
    //   if (para.classList.contains("active")) {
    //     currentParaIndex = i;
    //     return false;
    //   }
    //   return true;
    // });

    // let indices = {
    //   currentWordIndex: index,
    //   currentParaIndex: currentParaIndex,
    // };

    // return indices;
  }

  private createWordArray(words: NodeListOf<HTMLSpanElement>) {
    let wordArr: any[] = [];

    words.forEach((word: HTMLSpanElement, i) => {
      const m = parseInt(word.getAttribute("data-m")!!);
      const duration = parseInt(word.getAttribute("data-d")!!);
      if (duration > 0) {
        let p = word.parentNode!!;
        while (p !== document) {
          //@ts-ignore
          if (p.tagName.toLowerCase() === "p") {
            break;
          }
          p = p.parentNode!!;
        }
        wordArr[i] = { n: words[i], m: m, p: p };
        // wordArr[i].n.classList.remove(...wordArr[i].n.classList);
        // wordArr[i].n.style.backgroundColor = "transparent";
        // wordArr[i].n.classList.add("unread");
      } else {
        //@ts-ignore
        // words[i].classList.remove(...words[i].classList);
        wordArr[i] = undefined;
      }
    });

    return wordArr.filter((word) => word);
  }
}

// export const initInteractiveTranscript = () => {
//   return new InteractiveTranscript();
// };
export default InteractiveTranscript;

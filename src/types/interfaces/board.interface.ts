<<<<<<< HEAD
export default interface Board {
  boardNumber: number;
  boardWriteDate: string;
  boardTitle: string;
  boardContent: string;
  boardAddressCategory: string;
  boardDetailCategory: string;
  boardAddress: string;
  boardViewCount: number;
  boardImage: string | null;
=======
export default interface RecommandBoard {
    boardNumber : number;
    addressCategory : string;
    detailCategory : string;
    writeDate: string;
    title: string;
    viewCount : number;
    score : number;
    image : string;
}

export default interface Board {
    
>>>>>>> b8bb6dd0d0cd8533f023cd63f735d7cc660877ed
}
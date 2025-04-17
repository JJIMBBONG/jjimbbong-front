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
}
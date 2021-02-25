interface Parce {
    webpage: string;
}
declare const parce: ({ webpage }: Parce) => NodeListOf<Element>;
export default parce;

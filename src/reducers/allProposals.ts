

// interface IProposal {
//   _id: string;
//   avatar: string;
//   createdAt: Date | string;
//   email: string;
//   membershipType: string;
//   name: string;
//   payment: string;
//   pickelBallRating: string;
//   playerInfo: {
//     gear: string;
//     leftyOrRighty: 'lefty' | 'righty';
//     playingStyle: string;
//   };
//   profileEditedAt: Date | string;
//   season: string;
//   tennisRating: string;
//   trial: boolean;
// }


// const initialState: IProposal = {
//   _id: "",
//   avatar: "",
//   createdAt: "",
//   email: "",
//   membershipType: "",
//   name: "",
//   payment: "",
//   pickelBallRating: "",
//   playerInfo: {
//     gear: "",
//     leftyOrRighty: "lefty", // or "righty" based on your default
//     playingStyle: "",
//   },
//   profileEditedAt: "",
//   season: "",
//   tennisRating: "",
//   trial: false,
// };

// const proposalSlice = createSlice({
//   name: 'proposal', // Name your slice
//   initialState, // Provide the initial state
//   reducers: {
//     // Define your reducers here
//     updateProposal(state, action: PayloadAction<IProposal>) {
//       // Update the proposal state with the payload
//       return { ...state, ...action.payload };
//     },
//     resetProposal(state) {
//       // Reset the proposal state to initial state
//       return initialState;
//     },
//   },
// });
export {}

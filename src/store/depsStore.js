import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useDepsStore = create()(
  immer(() => ({
    // isDepLoading: false,
    departaments: null,
  }))
);

// const setDepId = (payload) => {
//   useDepsStore.setState({ data: payload });
// };

// const setIsDepLoading = (payload) => {
//   useDepsStore.setState({ isLoading: payload });
// };

const useDepartaments = () => useDepsStore();

const setDepartaments = (payload) => {
  useDepsStore.setState({ departaments: payload });
};

export { useDepartaments, setDepartaments };

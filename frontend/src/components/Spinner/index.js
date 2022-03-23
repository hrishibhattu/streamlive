import Loader from "react-loader-spinner";

export const SpinnerComponent = () => (
  <Loader type="MutatingDots" color="#00BFFF" height={80} width={80} />
);

export const SpinnerComponentTailSpin = () => (
  <Loader type="TailSpin" color="#00BFFF" height={30} width={30} />
);

import { SpinnerContainer, SpinnerOverlay } from "./spinnerStyles";

interface LoadingSpinnerProps {
    styles?: React.CSSProperties;
}

const LoadingSpinner = ({ styles }: LoadingSpinnerProps) => {
    // console.log("loading ...");
    return (
        <SpinnerOverlay style={styles}>
            <SpinnerContainer />
        </SpinnerOverlay>
    );
};

export default LoadingSpinner;

import NavigationBar from "../components/NavigationBar";
import NavigationPageProps from "../interfaces/NavigationPageProps";

function NavigationPageNoStyling({ children }: NavigationPageProps) {
  return (
    <>
      <NavigationBar />
      <div>{children}</div>
    </>
  );
}

export default NavigationPageNoStyling;

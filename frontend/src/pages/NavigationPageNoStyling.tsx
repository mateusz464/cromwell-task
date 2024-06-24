import NavigationBar from "../components/NavigationBar";
import NavigationPageProps from "../interfaces/NavigationPageProps";

// Used when a page needs a navigation bar
// Wraps the children in a NavigationBar and adds no additional styling
function NavigationPageNoStyling({ children }: NavigationPageProps) {
  return (
    <>
      <NavigationBar />
      <div>{children}</div>
    </>
  );
}

export default NavigationPageNoStyling;

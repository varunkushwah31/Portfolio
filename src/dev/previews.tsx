import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import ProjectDetail from "@/Pages/ProjectDetail.tsx";
import ProjectsPage from "@/Pages/ProjectsPage.tsx";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree/>}>
      <ComponentPreview path="/ProjectDetail">
        <ProjectDetail/>
      </ComponentPreview>
      <ComponentPreview path="/ProjectsPage">
        <ProjectsPage/>
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
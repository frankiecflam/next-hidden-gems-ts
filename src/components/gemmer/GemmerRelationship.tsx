import { createPortal } from "react-dom";
import Gemmer from "../../types/gemmer";
import { Overlay } from "../ui";
import { GemmerRelationshipModal } from "./";

interface GemmerRelationshipProps {
  onCloseModal: () => void;
  gemmer: Gemmer;
  view: "Followers" | "Following";
}

const GemmerRelationship = ({
  onCloseModal,
  gemmer,
  view,
}: GemmerRelationshipProps) => {
  return (
    <>
      {createPortal(
        <Overlay onClick={onCloseModal} />,
        document.getElementById("overlay-root")!
      )}
      {createPortal(
        <GemmerRelationshipModal
          onCloseModal={onCloseModal}
          gemmer={gemmer}
          view={view}
        />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

export default GemmerRelationship;

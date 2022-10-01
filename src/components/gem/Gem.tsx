import { createPortal } from "react-dom";
import { Overlay } from "../ui";
import { GemModal } from "./";
import GemType from "../../types/gem";
import GemmerType from "../../types/gemmer";

interface GemProps {
  gem: GemType;
  gemmer: GemmerType;
  onCloseModal: () => void;
}

const Gem = ({ gem, gemmer, onCloseModal }: GemProps) => {
  return (
    <>
      {createPortal(
        <Overlay onClick={onCloseModal} />,
        document.getElementById("overlay-root")!
      )}{" "}
      {createPortal(
        <GemModal onCloseModal={onCloseModal} gem={gem} gemmer={gemmer} />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

export default Gem;

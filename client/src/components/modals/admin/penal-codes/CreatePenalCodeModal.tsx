import * as React from "react";
import { connect } from "react-redux";
import { addPenalCode } from "../../../../lib/actions/admin";
import PenalCode from "../../../../interfaces/PenalCode";
import { modal } from "../../../../lib/functions";
import { ModalIds } from "../../../../lib/types";
import Modal from "../..";
import { useModalOpen } from "../../../../hooks/useModalOpen";

interface Props {
  addPenalCode: (data: Partial<PenalCode>) => Promise<boolean>;
}

const CreatePenalCodeModal: React.FC<Props> = ({ addPenalCode }) => {
  const [title, setTitle] = React.useState("");
  const [des, setDes] = React.useState("");
  const ref = useModalOpen<HTMLInputElement>(ModalIds.CreatePenalCode);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const added = await addPenalCode({
      title,
      des,
    });

    if (added === true) {
      setTitle("");
      setDes("");
      modal(ModalIds.CreatePenalCode).hide();
    }
  }

  return (
    <Modal size="lg" title={window.lang.codes.add_penal_code} id={ModalIds.CreatePenalCode}>
      <form onSubmit={onSubmit}>
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label" htmlFor="code">
              {window.lang.global.title}
            </label>
            <input
              ref={ref}
              id="title"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
              className="form-control bg-secondary border-secondary text-light"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="code">
              {window.lang.global.description}
            </label>
            <textarea
              rows={7}
              id="des"
              value={des}
              onChange={(e) => setDes(e.currentTarget.value)}
              className="form-control bg-secondary border-secondary text-light"
            ></textarea>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
            {window.lang.global.close}
          </button>
          <button type="submit" className="btn btn-primary">
            {window.lang.codes.add_code}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default connect(null, { addPenalCode })(CreatePenalCodeModal);

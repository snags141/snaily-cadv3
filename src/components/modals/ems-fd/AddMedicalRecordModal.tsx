import * as React from "react";
import { connect } from "react-redux";
import { Modal } from "@components/Modal/Modal";
import { Citizen } from "types/Citizen";
import { State } from "types/State";
import { searchNames } from "@actions/officer/OfficerActions";
import { createMedicalRecord } from "@actions/citizen/CitizenActions";
import { modal } from "@lib/utils";
import { ModalIds } from "types/ModalIds";
import { Select } from "@components/Select/Select";
import lang from "src/language.json";

interface Props {
  citizens: Citizen[];
  searchNames: () => void;
  createMedicalRecord: (id: string, data: Record<string, unknown>) => Promise<boolean | string>;
}

const AddMedicalRecord: React.FC<Props> = ({ citizens, searchNames, createMedicalRecord }) => {
  const [citizenId, setCitizenId] = React.useState("");
  const [type, setType] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    searchNames();
  }, [searchNames]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!citizenId) return;

    const success = await createMedicalRecord(citizenId, {
      type,
      shortInfo: description,
    });

    if (success) {
      modal(ModalIds.AddMedicalRecord)?.hide();

      setCitizenId("");
      setType("");
      setDescription("");
    }
  }

  return (
    <Modal title={lang.citizen.medical.add} id={ModalIds.AddMedicalRecord} size="lg">
      <form onSubmit={onSubmit}>
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label">{lang.citizen.medical.type}</label>

            <Select
              isClearable={false}
              onChange={(v) => setType(v?.value)}
              value={{ label: type, value: type }}
              isMulti={false}
              options={[
                {
                  label: "Allergy",
                  value: "Allergy",
                },
                {
                  label: "Medication",
                  value: "Medication",
                },
                {
                  label: "Health Problem",
                  value: "Health Problem",
                },
              ]}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">{lang.record.enter_name}</label>
            <Select
              options={citizens.map((citizen) => ({ label: citizen.full_name, value: citizen.id }))}
              closeMenuOnSelect={true}
              isMulti={false}
              onChange={(v) => setCitizenId(v.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">{lang.global.description}</label>
            <textarea
              className="form-control bg-secondary border-secondary text-light"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
            {lang.global.cancel}
          </button>
          <button disabled={!citizenId} type="submit" className="btn btn-primary">
            {lang.citizen.medical.add}
          </button>
        </div>
      </form>
    </Modal>
  );
};

const mapToProps = (state: State) => ({
  citizens: state.admin.citizens,
});

export const AddMedicalRecordModal = connect(mapToProps, { searchNames, createMedicalRecord })(
  AddMedicalRecord,
);

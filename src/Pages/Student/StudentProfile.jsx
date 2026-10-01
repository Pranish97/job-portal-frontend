import FileUpload from "../../Components/Reuseable/FileUpload";
import Panel from "../../Components/Student/Dashboard/Panel";
import EditableList from "../../Components/Student/Profile/EditableList";
import ProfileForm from "../../Components/Student/Profile/ProfileForm";
import ProfileHeader from "../../Components/Student/Profile/ProfileHeader";
import SkillsEditor from "../../Components/Student/Profile/SkillsEditor";


export default function StudentProfile() {
  return (
    <div className="mx-auto w-[92%] max-w-6xl space-y-6 py-8">
      <ProfileHeader completion={80} />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Panel title="Personal information">
            <ProfileForm />
          </Panel>

          <Panel title="Education">
            <EditableList
              initial={[
                { primary: "Bachelor in Computer Application (BCA)", secondary: "Samriddhi College, 2023 to present" },
                { primary: "Higher Secondary, Science", secondary: "NEB, 2021 to 2023" },
              ]}
              primaryLabel="Degree or course"
              secondaryLabel="Institution and years"
              addLabel="Add education"
              emptyText="No education added yet."
            />
          </Panel>

          <Panel title="Certifications">
            <EditableList
              initial={[{ primary: "React Basics", secondary: "Coursera, 2026" }]}
              primaryLabel="Certification name"
              secondaryLabel="Issuer and year"
              addLabel="Add certification"
              emptyText="No certifications added yet."
            />
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Resume">
            <FileUpload label="resume" initialName="Resume_2026.pdf" />
          </Panel>

          <Panel title="Skills">
            <SkillsEditor initial={["React", "JavaScript", "CSS", "SQL", "C#"]} />
          </Panel>
        </div>
      </div>
    </div>
  );
}
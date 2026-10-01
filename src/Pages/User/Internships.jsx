import InternshipList from "../../Components/User/Internship/InternshipList";
import InternshipCard from "../../Components/Reuseable/InternshipCard";
import ShowFor from "../../Components/Reuseable/ShowFor";

export default function Internships() {
  return (
    <section className="mx-auto w-[92%] max-w-6xl py-10">
      <h1 className="font-display text-3xl font-bold">Internships</h1>
      <ShowFor roles={["guest"]}>
        <p className="mb-6 mt-1 text-muted">Log in as a student to see how well you match each one.</p>
      </ShowFor>
      <ShowFor roles={["student"]}>
        <p className="mb-6 mt-1 text-muted">Match scores are based on your profile.</p>
      </ShowFor>

      <InternshipList>
        <InternshipCard id={1} category="Software" title="Frontend Developer Intern" company="Leapfrog Technology" location="Lalitpur" type="On-site" duration="3 months" skills={["React", "JavaScript", "CSS"]} deadline="2026-10-20" matchScore={88} />
        <InternshipCard id={2} category="Software" title=".NET Backend Intern" company="Fusemachines Nepal" location="Kathmandu" type="Hybrid" duration="6 months" skills={["C#", "ASP.NET Core", "SQL Server"]} deadline="2026-10-25" matchScore={76} />
        <InternshipCard id={3} category="Design" title="UI/UX Design Intern" company="Cotiviti Nepal" location="Remote" type="Remote" duration="3 months" skills={["Figma", "Research", "Prototyping"]} deadline="2026-11-02" matchScore={64} />
        <InternshipCard id={4} category="Software" title="QA Testing Intern" company="Verisk Nepal" location="Kathmandu" type="On-site" duration="4 months" skills={["Testing", "Selenium", "SQL"]} deadline="2026-11-05" matchScore={58} />
        <InternshipCard id={5} category="Data" title="Data Analyst Intern" company="Himal Analytics" location="Kathmandu" type="Hybrid" duration="3 months" skills={["Python", "SQL", "Excel"]} deadline="2026-10-30" matchScore={71} />
        <InternshipCard id={6} category="Marketing" title="Digital Marketing Intern" company="Sagarmatha Media" location="Pokhara" type="On-site" duration="2 months" skills={["SEO", "Content", "Canva"]} deadline="2026-11-08" matchScore={42} />
        <InternshipCard id={7} category="Finance" title="Accounting Intern" company="Annapurna Finance" location="Lalitpur" type="On-site" duration="6 months" skills={["Tally", "Excel", "Bookkeeping"]} deadline="2026-11-12" matchScore={35} />
        <InternshipCard id={8} category="Education" title="Teaching Assistant Intern" company="Lumbini Learning" location="Remote" type="Remote" duration="3 months" skills={["Communication", "Mathematics", "Moodle"]} deadline="2026-11-15" matchScore={29} />
      </InternshipList>
    </section>
  );
}
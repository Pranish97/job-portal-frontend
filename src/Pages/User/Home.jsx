import Button from "../../Components/Reuseable/Button";
import SearchBar from "../../Components/Reuseable/SearchBar";
import CategoryChip from "../../Components/Reuseable/CategoryChip";
import SkillBar from "../../Components/Reuseable/SkillBar";
import SectionHeading from "../../Components/Reuseable/SectionHeading";
import InternshipCard from "../../Components/Reuseable/InternshipCard";
import ShowFor from "../../Components/Reuseable/ShowFor";

export default function Home() {
  return (
    <>
      <section className="border-b border-line bg-white py-14">
        <div className="mx-auto grid w-[92%] max-w-6xl items-center gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
              Find the internship that fits what you already know.
            </h1>
            <p className="mt-3 max-w-[52ch] text-lg text-muted">
              See your match score, spot the skills you're missing, and apply with confidence.
            </p>
            <SearchBar />
            <div className="flex flex-wrap gap-2">
              <CategoryChip name="Software" />
              <CategoryChip name="Design" />
              <CategoryChip name="Marketing" />
              <CategoryChip name="Data" />
              <CategoryChip name="Finance" />
              <CategoryChip name="Education" />
            </div>
          </div>

          <aside aria-label="Example match score" className="rounded-2xl bg-ink p-7 text-white">
            <p className="text-sm text-slate-400">Example: Frontend Developer Intern</p>
            <p className="font-display text-6xl font-bold text-marigold">88%</p>
            <p>match with your profile</p>
            <SkillBar skill="React" percent={100} />
            <SkillBar skill="JavaScript" percent={90} />
            <SkillBar skill="CSS" percent={80} />
            <SkillBar skill="Git" percent={30} />
            <p className="mt-3 text-sm">Gap found: <strong>Git</strong>. Learn it to reach 95%.</p>
          </aside>
        </div>
      </section>

      <section className="mx-auto w-[92%] max-w-6xl py-12">
        <SectionHeading
          title="Latest internships"
          action={<Button to="/internships" variant="outline">View all</Button>}
        />
        <ShowFor roles={["guest"]}>
          <p className="-mt-3 mb-5 text-muted">Log in to see how well you match.</p>
        </ShowFor>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <InternshipCard id={1} title="Frontend Developer Intern" company="Leapfrog Technology" location="Lalitpur" type="On-site" duration="3 months" skills={["React", "JavaScript", "CSS"]} deadline="2026-10-20" matchScore={88} />
          <InternshipCard id={2} title=".NET Backend Intern" company="Fusemachines Nepal" location="Kathmandu" type="Hybrid" duration="6 months" skills={["C#", "ASP.NET Core", "SQL Server"]} deadline="2026-10-25" matchScore={76} />
          <InternshipCard id={3} title="UI/UX Design Intern" company="Cotiviti Nepal" location="Remote" type="Remote" duration="3 months" skills={["Figma", "Research", "Prototyping"]} deadline="2026-11-02" matchScore={64} />
          <InternshipCard id={4} title="QA Testing Intern" company="Verisk Nepal" location="Kathmandu" type="On-site" duration="4 months" skills={["Testing", "Selenium", "SQL"]} deadline="2026-11-05" matchScore={58} />
        </div>
      </section>

      <section className="mx-auto w-[92%] max-w-6xl py-12">
        <SectionHeading title="How it works" />
        <ol className="grid gap-6 md:grid-cols-3">
          <li className="border-l-4 border-marigold pl-4">
            <h3 className="font-display font-semibold">Build your profile</h3>
            <p className="text-muted">Add skills, education and your CV once.</p>
          </li>
          <li className="border-l-4 border-marigold pl-4">
            <h3 className="font-display font-semibold">Check your match</h3>
            <p className="text-muted">Every internship shows how well you fit and what is missing.</p>
          </li>
          <li className="border-l-4 border-marigold pl-4">
            <h3 className="font-display font-semibold">Apply and track</h3>
            <p className="text-muted">Follow each application from submitted to offer.</p>
          </li>
        </ol>
      </section>

      <ShowFor roles={["guest"]}>
        <section className="mx-auto mb-12 w-[92%] max-w-6xl rounded-2xl border border-line bg-white py-12 text-center">
          <h2 className="font-display text-2xl font-bold">Hiring interns?</h2>
          <p className="my-2 text-muted">Post an internship and review applicants ranked by match score.</p>
          <Button to="/register?role=employer" variant="outline">Register as employer</Button>
        </section>
      </ShowFor>
    </>
  );
}
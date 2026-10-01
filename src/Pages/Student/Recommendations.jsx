import Button from "../../Components/Reuseable/Button";
import RecommendationCard from "../../Components/Student/Recommendation/RecommendationCard";

export default function Recommendations() {
  return (
    <section className="mx-auto w-[92%] max-w-4xl py-10">
      <h1 className="font-display text-3xl font-bold">Recommended for you</h1>
      <p className="mb-6 mt-1 text-muted">Ranked by how well your skills match each internship.</p>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-white p-4">
        <p>Add more skills to your profile to get better matches.</p>
        <Button to="/student/profile" variant="outline">Update profile</Button>
      </div>

      <div className="space-y-4">
        <RecommendationCard id={1} title="Frontend Developer Intern" company="Leapfrog Technology" location="Lalitpur" type="On-site" matchScore={88} matched={["React", "JavaScript", "CSS"]} missing={["Git"]} />
        <RecommendationCard id={2} title=".NET Backend Intern" company="Fusemachines Nepal" location="Kathmandu" type="Hybrid" matchScore={76} matched={["C#", "SQL Server"]} missing={["ASP.NET Core"]} />
        <RecommendationCard id={5} title="Data Analyst Intern" company="Himal Analytics" location="Kathmandu" type="Hybrid" matchScore={71} matched={["SQL", "Excel"]} missing={["Python"]} />
        <RecommendationCard id={3} title="UI/UX Design Intern" company="Cotiviti Nepal" location="Remote" type="Remote" matchScore={64} matched={["Figma"]} missing={["Research", "Prototyping"]} />
        <RecommendationCard id={4} title="QA Testing Intern" company="Verisk Nepal" location="Kathmandu" type="On-site" matchScore={58} matched={["SQL"]} missing={["Testing", "Selenium"]} />
      </div>
    </section>
  );
}
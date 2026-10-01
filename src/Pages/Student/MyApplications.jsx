import ApplicationCard from "../../Components/Student/Application/ApplicationCard";
import ApplicationList from "../../Components/Student/Application/ApplicationList";

export default function MyApplications() {
  return (
    <section className="mx-auto w-[92%] max-w-4xl py-10">
      <h1 className="font-display text-3xl font-bold">My applications</h1>
      <p className="mb-6 mt-1 text-muted">Track every application from submitted to offer.</p>

      <ApplicationList>
        <ApplicationCard id={3} title="UI/UX Design Intern" company="Cotiviti Nepal" location="Remote" appliedOn="Sep 28, 2026" status="Interview" matchScore={64} />
        <ApplicationCard id={5} title="Data Analyst Intern" company="Himal Analytics" location="Kathmandu" appliedOn="Sep 25, 2026" status="Shortlisted" matchScore={71} />
        <ApplicationCard id={4} title="QA Testing Intern" company="Verisk Nepal" location="Kathmandu" appliedOn="Sep 22, 2026" status="Under review" matchScore={58} />
        <ApplicationCard id={1} title="Frontend Developer Intern" company="Leapfrog Technology" location="Lalitpur" appliedOn="Sep 30, 2026" status="Submitted" matchScore={88} />
        <ApplicationCard id={2} title=".NET Backend Intern" company="Fusemachines Nepal" location="Kathmandu" appliedOn="Sep 29, 2026" status="Submitted" matchScore={76} />
        <ApplicationCard id={6} title="Digital Marketing Intern" company="Sagarmatha Media" location="Pokhara" appliedOn="Sep 18, 2026" status="Rejected" matchScore={42} />
      </ApplicationList>
    </section>
  );
}
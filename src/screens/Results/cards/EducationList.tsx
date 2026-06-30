// ARM lists education as "X or Y"; render each as its own bulleted line. Shared by the role tab,
// the constellation side panel, and the job overview (D-029). Tokens only.
export function EducationList({ education }: { education: string }) {
  return (
    <ul className="flex flex-col gap-space-1">
      {education.split(' or ').map((line) => (
        <li key={line} className="flex gap-space-2 font-body text-body text-text-on-dark-muted">
          <span className="text-text-on-dark-faint">&bull;</span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

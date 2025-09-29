
export default function AccordionItem({ children, className, title }) {
  return (
    <li className={className}>
      <h3>{title}</h3>
      <div>
        {children}
      </div>
    </li>
  )
}

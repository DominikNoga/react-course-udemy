import styled from "styled-components";

const INVALID_COLOR = '#f87171';

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({$invalid}) => $invalid ? INVALID_COLOR : '#6b7280'};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  line-height: 1.5;
  background-color: ${({$invalid}) => !$invalid ? '#d1d5db' : '#fed2d2'};
  color: ${({$invalid}) => !$invalid ? '#374151' : '#ef4444'};
  border-color: ${({$invalid}) => !$invalid ? 'transparent' : '#f73f3f'};
  border: 1px solid transparent;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

export default function InputGroup({label, invalid, ...props}) {
    return (
        <p>
            <Label $invalid={invalid}>{label}</Label>
            <Input $invalid={invalid} {...props}></Input>
        </p>
    )
}

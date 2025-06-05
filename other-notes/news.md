# Here i will put some new stuff i have heard about React
* Since React 19 the useMemo is applied automatically to values derived from state.

````jsx
function Component() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const fullName = `${name} ${lastName}`;
  // this is the same as
  const fullName = useMemo(() => `${name} ${lastName}`,
    [name, lastName],
  );
}
````
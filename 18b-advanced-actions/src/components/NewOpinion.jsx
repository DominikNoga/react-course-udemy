import { useActionState, useContext } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

const isValid = ({ userName, title, body }) => userName && title && body;

export function NewOpinion() {
  const { addOpinion } = useContext(OpinionsContext);
  async function submitAction(prevFormData, formData) {
    const opinion = {
      userName: formData.get('userName'),
      title: formData.get('title'),
      body: formData.get('body'),
    };

    if (!isValid(opinion)) return {
      error: 'All fields are required',
    };

    try {
      await addOpinion(opinion);
      return {
        error: null,
      }
    } catch (error) {
      return {
        error: `sth went wrong: ${error}`
      }
    }

  }
  const [{ error }, updatedAction] = useActionState(submitAction, {});

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={updatedAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5}></textarea>
        </p>

        {error && (
          <ul className="errors">
            <li>{error}</li>
          </ul>
        )}

        <Submit />
      </form>
    </div>
  );
}

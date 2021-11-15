import { Field, useField } from "react-final-form";

const CHOICES = [
  "Never",
  "A Few Times per Year",
  "Once a Month",
  "A Few Times per Month",
  "Once a Week",
  "A Few Timer per Week",
  "Everyday",
];

export default function Question({ step = 0, question_idx = 0, title = "" }) {
  const field = useField(`section_${step}_${question_idx}`);

  return (
    <div className="shadow-md rounded-md p-3 mt-4">
      <h5>
        {question_idx + 1}. {title}
      </h5>
      {CHOICES.map((label, idx) => (
        <div
          key={idx}
          className="d-flex flex-row sm:flex-col justify-around mt-2"
        >
          <div>
            <Field
              type="radio"
              name={`section_${step}_${question_idx}`}
              value={String(idx)}
              component={"input"}
              id={`section_${step}_${question_idx}_${idx}`}
            />
            <label
              htmlFor={`section_${step}_${question_idx}_${idx}`}
              className="ml-2"
            >
              {label}
            </label>
          </div>
        </div>
      ))}
      {field.meta.error && field.meta.touched && (
        <p className="text-red-500">* {field.meta.error}</p>
      )}
    </div>
  );
}

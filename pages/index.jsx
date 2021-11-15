import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Form } from "react-final-form";
import Question from "../component/Question";
import Head from "next/head";
import classNames from "classnames";

const questions = [
  [
    "I am feel emotionally drained by my work.",
    "Working with people all daylong requires a great deal of effort. ",
    "I feel like my work is breaking me down. ",
    "I feel frustrated by my work. ",
    "I feel that I work too hard at my job. ",
    "It stresses me too much to work in direct contact with people. ",
    "I feel like I am at the end of my tether.",
  ],
  [
    "I feel I deal with colleagues or clients impersonally, as if they were objects.",
    "I feel tired when I get up in the morning and have to face another day at work. ",
    "I have the impression that my colleagues or clients make me responsible for some of their problems. ",
    "I am at the end of my patience at the end of my work day. ",
    "I really don’t care about what happens to some of my colleagues/ clients.",
    "I am more insensitive to people I was working with. ",
    "I am afraid that the job was making me uncaring.",
  ],
  [
    "I have accomplished many worthwhile things in the job.",
    "I feel full of energy.",
    "I can easily understand what my colleagues or clients feel.",
    "I look after my colleagues’ problems very effectively.",
    "In my work, I handle emotional problems very calmly.",
    "Through my work, I feel that I have a positive influence on people.",
    "I am easily able to create a relaxed atmosphere with my colleagues",
    " I feel refreshed when I have been close to my colleagues at work",
  ],
];

export default function Home() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const [scores, setScores] = useState([[], [], []]);

  const next = useCallback(() => {
    if (step + 1 < questions.length) setStep(step + 1);
  }, [step]);

  const prev = useCallback(() => {
    if (step - 1 >= 0) setStep(step - 1);
  }, [step]);

  const submit = useCallback(() => {
    const total_a = scores[0].reduce((curr, val) => curr + +val, 0);
    const total_b = scores[1].reduce((curr, val) => curr + +val, 0);
    const total_c = scores[2].reduce((curr, val) => curr + +val, 0);
    router.push({ pathname: `/result/${total_a}/${total_b}/${total_c}` });
  }, [scores]);

  const onScoreChange = (step, question_idx, value) => {
    const newScore = { ...scores };
    newScore[step][question_idx] = value;
    setScores(newScore);
  };

  const scorePerSection = useMemo(
    () => scores[step]?.reduce((curr, val) => curr + +val, 0),
    [scores, step]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  return (
    <>
      <Head>
        <title>Survey | How burnout are you?</title>
      </Head>
      <div className="md:container mx-auto p-3">
        <section className="header mb-5">
          <h1 className="text-center font-bold capitalize">
            How burnout are you?
          </h1>
          {step === 0 ? (
            <p className="mt-3">
              Hi guys, the objective of this test is simply to make you aware
              that anyone may be at risk of burnout. For each question, indicate
              the score that corresponds to your response relevant to how you
              have felt during the last 2 weeks. There's no "right" or "wrong"
              answer, so please fill in honestly :)
            </p>
          ) : null}
        </section>
        <div className="bg-gray-100 mb-3 h-1"></div>
        <Form
          onSubmit={submit}
          keepDirtyOnReinitialize
          validate={(values) => {
            return questions[step].reduce((curr, _, question_idx) => {
              if (!values[`section_${step}_${question_idx}`])
                curr[`section_${step}_${question_idx}`] = `Required`;
              return curr;
            }, {});
          }}
          render={({ handleSubmit, hasValidationErrors }) => (
            <form onSubmit={handleSubmit}>
              <h3
                className={classNames({
                  "text-blue-400": step === 0,
                  "text-green-400": step === 1,
                  "text-yellow-400": step === 2,
                })}
              >
                <span className={"font-bold"}>Section {step + 1}</span> / 3
                <span className="ml-3">Score: {scorePerSection}</span>
              </h3>
              {questions[step]?.map((title, idx) => (
                <Question
                  question_idx={idx}
                  step={step}
                  key={idx}
                  onChange={onScoreChange}
                  title={title}
                />
              ))}

              <div className="mt-3 flex justify-end space-x-4">
                {step > 0 && (
                  <button
                    type="button"
                    className="border shadow-sm bg-white border-green-400 text-white p-3 rounded w-32 font-semibold text-green-400"
                    onClick={prev}
                  >
                    Prev
                  </button>
                )}

                {step < questions.length - 1 && (
                  <button
                    type="button"
                    className="shadow-sm bg-green-400 text-white p-3 rounded w-32 font-semibold text-center disabled:bg-green-100"
                    onClick={next}
                    disabled={hasValidationErrors}
                  >
                    Next
                  </button>
                )}

                {step === questions.length - 1 && (
                  <button
                    type={"submit"}
                    className="shadow-sm bg-green-400 text-white p-3 rounded w-32 font-semibold text-center"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          )}
        />
      </div>
    </>
  );
}

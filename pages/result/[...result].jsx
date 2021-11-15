import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import classNames from "classnames";

export default function Result() {
  const { query, isFallback } = useRouter();
  const [seeResult, setSeeResult] = useState(false);

  const [section_a, section_b, section_c] = query?.result ?? [];

  const section_a_label = useMemo(() => {
    if (+section_a <= 17) return "Low-level burnout";
    else if (+section_a >= 18 && +section_a <= 29) return "Moderate burnout";
    return "High-level burnout";
  }, []);

  const section_b_label = useMemo(() => {
    if (+section_b <= 5) return "Low-level burnout";
    else if (+section_b >= 6 && +section_b <= 11) return "Moderate burnout";
    return "High-level burnout";
  }, []);

  const section_c_label = useMemo(() => {
    if (+section_c <= 33) return "High-level burnout";
    else if (+section_c >= 34 && +section_c <= 39) return "Moderate burnout";
    return "Low-level burnout";
  }, []);

  const onSeeResult = useCallback(() => {
    setSeeResult(true);
  }, []);

  if (isFallback) return <div>loading...</div>;
  return (
    <>
      <Head>
        <title>Survey Result | How burnout are you?</title>
      </Head>
      <div
        className="container flex flex-col justify-center items-center mx-auto p-3"
        style={{ height: "100vh" }}
      >
        {!seeResult ? (
          <>
            <h1>Ready to see your score?</h1>
            <button
              className="rounded bg-blue-400 font-bold py-3 px-10 text-white mt-3"
              onClick={onSeeResult}
            >
              Yeah! Let me see.
            </button>
          </>
        ) : (
          <div
            className={
              "result mt-4 grid grid-row-3 md:grid-cols-3 x-sm:space-y-8 md:space-x-5 md:space-y-0"
            }
          >
            <div className="flex flex-col">
              <h3 className="rounded py-2 bg-blue-400 text-center font-semibold text-white">
                SECTION A
              </h3>
              <h5 className="font-semibold text-blue-400">
                Emotional Exhaustion
              </h5>
              <p className="mt-3 font-light">Score: {section_a}</p>
              <p className="mt-3 font-bold text-blue-400">{section_a_label}</p>
            </div>

            <div className="flex flex-col">
              <h3 className="rounded py-2 bg-green-400 text-center font-semibold text-white">
                SECTION B
              </h3>
              <h5 className="font-semibold text-green-400">
                Depersonalisation
              </h5>
              <p className="mt-3 font-light">Score: {section_b}</p>
              <p className="mt-3 font-bold text-green-400">{section_b_label}</p>
            </div>

            <div className="flex flex-col">
              <h3 className="rounded py-2 bg-yellow-400 text-center font-semibold text-white">
                SECTION C
              </h3>
              <h5 className="font-semibold text-yellow-400">
                Lack of Personal Achievement
              </h5>
              <p className="mt-3 font-light">Score: {section_c}</p>
              <p className="mt-3 font-bold text-yellow-400">
                {section_c_label}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

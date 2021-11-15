import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

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
  }, [seeResult]);

  if (isFallback) return <div>loading...</div>;
  return (
    <>
      <Head>
        <title>Survey Result | How burnout are you?</title>
      </Head>
      <div className="container mx-auto p-3">
        {!seeResult ? (
          <>
            <h1>Ready to see your score?</h1>
            <button
              className="rounded bg-blue-400 font-bold py-3 px-10 text-white"
              onClick={onSeeResult}
            >
              Yeah! Let me see.
            </button>
          </>
        ) : (
          <div className="result mt-4 grid grid-cols-3 space-x-5">
            <div className="flex flex-col">
              <h3 className="rounded py-2 bg-blue-400 text-center font-semibold text-white">
                SECTION A
              </h3>
              <p className="mt-3 font-bold text-blue-400">{section_a_label}</p>
              <p className="mt-3 font-light">Score: {section_a}</p>
              <div className="mt-6">
                <p>Total 17 or less:</p>
                <p className="font-bold">Low-level burnout</p>
                <div className="my-4">
                  <p>Total between 18 and 29 inclusive:</p>
                  <p className="font-bold">Moderate burnout</p>
                </div>
                <p>Total over 30:</p>
                <p className="font-bold">High-level burnout</p>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="rounded py-2 bg-green-400 text-center font-semibold text-white">
                SECTION B
              </h3>
              <p className="mt-3 font-bold text-green-400">{section_b_label}</p>
              <p className="mt-3 font-light">Score: {section_b}</p>

              <div className="mt-6">
                <p>Total 5 or less:</p>
                <p className="font-bold">Low-level burnout</p>
                <div className="my-4">
                  <p>Total between 6 and 11 inclusive:</p>
                  <p className="font-bold">Moderate burnout</p>
                </div>
                <p>Total of 12 and greater:</p>
                <p className="font-bold">High-level burnout</p>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="rounded py-2 bg-yellow-400 text-center font-semibold text-white">
                SECTION C
              </h3>
              <p className="mt-3 font-bold text-yellow-400">
                {section_c_label}
              </p>
              <p className="mt-3 font-light">Score: {section_c}</p>
              <div className="mt-6">
                <p>Total 33 or less:</p>
                <p className="font-bold">High-level burnout</p>
                <div className="my-4">
                  <p>Total between 34 and 39 inclusive:</p>
                  <p className="font-bold">Moderate burnout</p>
                </div>
                <p>Total greater than 40:</p>
                <p className="font-bold">Low-level burnout</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

import { useMemo } from "react";
import { useRouter } from "next/router";

export default function Result() {
  const { query } = useRouter();
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

  const ViewResult = useMemo(
    () => (
      <div className="result grid grid-cols-3 space-x-5">
        <div className="flex flex-col">
          <h3 className="rounded py-2 bg-blue-400 text-center font-semibold text-white">
            SECTION A
          </h3>
          <p className="mt-3 font-bold text-blue-400">{section_a_label}</p>
        </div>

        <div className="flex flex-col">
          <h3 className="rounded py-2 bg-green-400 text-center font-semibold text-white">
            SECTION B
          </h3>
          <p className="mt-3 font-bold text-green-400">{section_b_label}</p>
        </div>

        <div className="flex flex-col">
          <h3 className="rounded py-2 bg-yellow-400 text-center font-semibold text-white">
            SECTION C
          </h3>
          <p className="mt-3 font-bold text-yellow-400">{section_c_label}</p>
        </div>
      </div>
    ),
    [section_a_label, section_b_label, section_c_label]
  );

  return (
    <div className="container mx-auto p-3">
      <h1>Ready to see your score?</h1>
      <ViewResult />
    </div>
  );
}

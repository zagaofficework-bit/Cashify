import { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: "calls",
    title: "Are you able to make and receive calls?",
    hint: "Check your device for cellular network connectivity issues.",
    category: "Device Details",
    yesLabel: "Calls Working Fine",
    noLabel:  "Not Able to Make and Receive Calls",
  },
  {
    id: "touchscreen",
    title: "Is your device's touch screen working properly?",
    hint: "Check the touch screen functionality of your phone.",
    category: "Screen Condition",
    yesLabel: "Touch Screen Working",
    noLabel:  "Touch Faulty",
  },
  {
    id: "original_screen",
    title: "Is your phone's screen original?",
    hint: 'Pick "Yes" if screen was never changed or was changed by Authorized Service Center. Pick "No" if screen was changed at local shop.',
    category: "Screen Condition",
    yesLabel: "Original Screen",
    noLabel:  "Screen Replaced (Local Shop)",
  },
];

const device = {
  name: "Xiaomi Mi A2",
  variant: "4 GB / 64 GB",
  img: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-mi-a2.jpg",
};

export default function YesNo() {
  const [answers, setAnswers] = useState({});

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;

  // Group all answers by category for sidebar
  const evaluation = questions.reduce((acc, q) => {
    if (answers[q.id]) {
      if (!acc[q.category]) acc[q.category] = [];
      acc[q.category].push({
        label: answers[q.id] === "yes" ? q.yesLabel : q.noLabel,
        type:  answers[q.id],
      });
    }
    return acc;
  }, {});

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-start justify-center gap-6">

      {/* ── LEFT: Questions ── */}
      <div className="flex-1 max-w-xl bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Tell us more about your device?</h2>
          <p className="text-sm text-gray-400 mt-1.5">Please answer a few questions about your device.</p>
        </div>

        {/* Questions */}
        <div className="space-y-7">
          {questions.map((q, i) => (
            <div key={q.id}>
              <p className="text-sm font-bold text-gray-800">
                {i + 1}. {q.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 mb-3">{q.hint}</p>

              <div className="flex gap-3">
                {["yes", "no"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                    className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 w-32 ${
                      answers[q.id] === opt
                        ? "border-teal-500 bg-teal-50 text-teal-700"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-teal-300 hover:bg-white"
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${answers[q.id] === opt ? "border-teal-500" : "border-gray-300"}`}>
                      {answers[q.id] === opt && <span className="w-2 h-2 rounded-full bg-teal-500" />}
                    </span>
                    {opt === "yes" ? "Yes" : "No"}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Progress + Continue */}
        <div className="mt-10 space-y-3">
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${(answered / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 text-right">{answered}/{questions.length} answered</p>

          <button
            disabled={!allAnswered}
            onClick={() => navigate('/defects')}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              allAnswered
                ? "bg-teal-500 text-white hover:bg-teal-600 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

      </div>

      {/* ── RIGHT: Sidebar ── */}
      <div className="w-72 space-y-4 sticky top-6">

        {/* Device card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
          <div className="w-14 h-16 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-100 flex-shrink-0">
            <img src={device.img} alt={device.name} className="w-10 h-14 object-contain" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{device.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{device.variant}</p>
          </div>
        </div>

        {/* Evaluation */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm font-semibold text-gray-800 mb-4">Device Evaluation</p>

          {Object.keys(evaluation).length === 0 ? (
            <p className="text-xs text-gray-400">Your answers will appear here.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(evaluation).map(([category, items]) => (
                <div key={category}>
                  <p className="text-xs font-semibold text-gray-500 mb-1.5">{category}</p>
                  <ul className="space-y-1.5">
                    {items.map((item) => (
                      <li key={item.label} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.type === "yes" ? "bg-green-400" : "bg-red-400"}`} />
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
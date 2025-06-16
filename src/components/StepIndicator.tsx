type StepIndicatorProps = {
    currentForm: number;
};

export const StepIndicator = ({ currentForm }: StepIndicatorProps) => {
    return (
        <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2].map((index) => (
                <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                        currentForm === index ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    aria-label={`Ir para formulário ${index + 1}`}
                />
            ))}
        </div>
    );
};

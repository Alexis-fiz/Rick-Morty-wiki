export default function Keyboard({keyboard}: {keyboard: any}) {
    return (
        <div>
            {keyboard.map((button: any) => (
                <div key={button.value} >
                <button
                        onClick={() => button.action(button.value)}
                    >
                        {button.label}
                    </button>
                    </div>
                ))}
                </div>
    )
}
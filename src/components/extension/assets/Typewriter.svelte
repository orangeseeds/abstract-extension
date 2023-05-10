<script>
    import "../../app.css"
    export let phrase = ""; // text to be typed
    export let delay = 0;
    let typedChar = ""; // SECTION displaying typed text

    if (delay == 0) {
        typedChar = phrase;
    } else {
        let index = 0;
        let typewriter; // for setInterval/clearInterval

        // If Input is empty, clear out SECTION displaying typed text
        $: if (!phrase) {
            typedChar = "";
            index = typedChar.length;
        }

        // Disable START button; prevent clicking twice
        let isTyping = false;

        const typeChar = () => {
            if (index < phrase.length) {
                isTyping = true;
                typedChar += phrase[index];
                index += 1;
            }
        };

        const typing = () => (typewriter = setInterval(typeChar, delay));
        typing();
    }
</script>

<p class="break-words text-base">{typedChar}</p>


const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {

    // Putting all this HTML into that autocomplete class
    root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
    `;

    // Selecting the tags/elements we want
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

    const onInput = async (eventObj) => {
        // This will get us whatever the user just typed into that input, then throw it into the fetchData function, then save it in movies variable
        const items = await fetchData(eventObj.target.value);

        // if there's no characters (string) in the search bar then remove the dropdown tab
        if (!items.length) {
            dropdown.classList.remove('is-active');
            return;
        }

        resultsWrapper.innerHTML = '';
        dropdown.classList.add('is-active');
        for (let item of items) {
            const option = document.createElement('a');

            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
            });

            resultsWrapper.appendChild(option);
        }
    };

    // Adding an Event listener to the element we Selected and passing in a function as an argument
    input.addEventListener('input', debounce(onInput, 500));

    document.addEventListener('click', eventObj => {
        // if the click is not in the root element, or a children of the root then remove the dropdown
        if (!root.contains(eventObj.target)) {
            dropdown.classList.remove('is-active');
        }
    });
};
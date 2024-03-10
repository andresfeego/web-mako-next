import { useState } from "react";
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Tags = ({setTagsText}) => {

    const [tags, setTags] = useState([])
    const [suggestions, setSuggestions] = useState([
        { id: 'domicilios', text: 'domicilios' },
        { id: 'zapatos', text: 'zapatos' },
        { id: 'aretes', text: 'aretes' },
        { id: 'balon', text: 'balon' },
        { id: 'celulares', text: 'celulares' },
        { id: 'ropa', text: 'ropa' }
    ])

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
        setTagsText(convertirTags(tags.filter((tag, index) => index !== i)))
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
        setTagsText(convertirTags([...tags, tag]))
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
        setTagsText(convertirTags(newTags))
    };

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

     const convertirTags = () => {
        const tagsLen = tags.length;
        var newTags = ''
        tags.map((item, i) => {
            if (tagsLen == i + 1) {
                newTags = newTags + item.text
            } else {
                newTags = newTags + item.text + ','
            }
        })
        return newTags
    } 

    return (
        <div>
            <span className="palabrasClave">Agrega palabras clave por las cuales encontraran tu negocio en google, escribe la palabra o frase y presiona enter o ,</span>
            <ReactTags
                tags={tags}
                suggestions={suggestions}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                placeholder={"Palabras clave"}
                inputFieldPosition="bottom"
                autocomplete
            />
        </div>
    );
}

export default Tags;
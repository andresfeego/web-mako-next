import { Button } from "@mui/material";
import { useState } from "react";
import { WithContext as ReactTags } from 'react-tag-input';
import { nuevoMensaje, tiposAlertas } from "../../../../Inicialized/Toast";
import styles from './Tags.module.scss'
import { useEffect } from "react";

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Tags = ({ setTagsText, tagsIniciales}) => {

    const [tags, setTags] = useState([])
    const [input, setInput] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [suggestions, setSuggestions] = useState([
        { id: 'domicilios', text: 'domicilios' },
        { id: 'zapatos', text: 'zapatos' },
        { id: 'aretes', text: 'aretes' },
        { id: 'balon', text: 'balon' },
        { id: 'celulares', text: 'celulares' },
        { id: 'ropa', text: 'ropa' }
    ])

    useEffect(() =>{
        if (tagsIniciales == '') {
            setTags([])
        }
    }, [tagsIniciales])

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

    const handleInputChange = (value, event) => {
        setInputValue(value)
        setInput(event)
    }

    const handleAgregarTag = () => {
        const tagRepeat = tags.find(tag => tag.text == inputValue)
        if ( !tagRepeat ) {
            const auxi = { id: inputValue, text: inputValue }
            setTags([...tags, auxi]);
            setTagsText(convertirTags([...tags, auxi]))
            input.target.value = ''
        }else{
            nuevoMensaje(tiposAlertas.info, "El tag ya existe")
        }
    }

    return (
        <div className={styles.tagsContainer}>
            <ReactTags
                tags={tags}
                suggestions={suggestions}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                placeholder={"Palabras clave"}
                handleInputChange={handleInputChange}
                inputFieldPosition="top"
                autocomplete
                classNames={{
                    tags: 'tagsClass',
                    tagInputField: styles.inputField,
                    selected: styles.tags,
                    tag: styles.tag,
                    remove: styles.removeTags,
                    suggestions: 'suggestionsClass',
                    activeSuggestion: 'activeSuggestionClass',
                    editTagInput: 'editTagInputClass',
                    editTagInputField: 'editTagInputField',
                    clearAll: 'clearAllClass',
                  }}
            />
            <div className={styles.buttonAgregar} title='Agregar' onClick={handleAgregarTag}>Agregar</div>

        </div>

    );
}

export default Tags;
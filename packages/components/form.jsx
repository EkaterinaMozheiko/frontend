const React = require('react');
import Input from './input';
import Button from './button';
const { div } = require('react-dom');

const Form = () => {
    return(
        <div className="form-wrapper">
            <Input className="input input_big" placeholder="Question"/>
            <Input className="input" placeholder="Option 1"/>
            <Input className="input" placeholder="Option 2"/>
            <Input className="input" placeholder="Option 3"/>
            <div className="button-wrapper">
                <Button className="button button_small" type="button" name="Add Options" value="+ Add option"/>
                <Button className="button button__send" type="submit" name="Create" value="Create"/>
            </div>
        </div>
    );
};

export default Form;
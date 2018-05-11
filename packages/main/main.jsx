const React = require('react');
import Input from '../components/input';
import Header from '../components/header';
import Button from '../components/button';
const { div } = require('react-dom');

const Main = () => (
    <div className="poll-application">
        <Header/>
        <Input placeholder="Question"/>
        <Input placeholder="Option 1"/>
        <Input placeholder="Option 2"/>
        <Input placeholder="Option 3"/>
        <Button className="button button_small" type="button" name="Add Options"/>
        <Button className="button button__send" type="submit" name="Create"/>
    </div>
    );

module.exports = Main;
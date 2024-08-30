import React from 'react';

const Form = () => {
    return (
        <>
            <Form>
                <div className="input-group input-group-lg">
                    <input type="text" className="form-control" aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-lg"/>
                </div>
                <button type="submit" className="btn btn-primary">Shorten</button>
            </Form>
        </>
    );
};

export default Form;
/* eslint-disable react/prop-types */
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { getRandomColors } from '../../helpers/getRamdonColors';
import TextArea from 'antd/es/input/TextArea';

const AddModal = ({ isOpen, onClose, setOpen, handleAddTask }) => {
    const initialTaskData = {
        id: uuidv4(),
        company: "",
        job: "",
        jobtitle: "",
        priority: "",
        deadline: 0,
        image: "",
        alt: "",
        tags: [],
    };

    const [taskData, setTaskData] = useState(initialTaskData);
    const [tagTitle, setTagTitle] = useState("");

    const handleChange = (
        e
    ) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                if (e.target) {
                    setTaskData({ ...taskData, image: e.target.result });
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleAddTag = () => {
        if (tagTitle.trim() !== "") {
            const { bg, text } = getRandomColors();
            const newTag = { title: tagTitle.trim(), bg, text };
            setTaskData({ ...taskData, tags: [...taskData.tags, newTag] });
            setTagTitle("");
        }
    };

    const closeModal = () => {
        setOpen(false);
        onClose();
        setTaskData(initialTaskData);
    };

    const handleSubmit = () => {
        handleAddTask(taskData);
        closeModal();
    };

    return (
        <div
            className={`w-screen h-screen place-items-center fixed top-0 left-0 ${isOpen ? "grid" : "hidden"}`}
        >
            <div
                className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
                onClick={closeModal}
            ></div>
            <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
                <div><label className='text-left'>Add Job</label></div>
                <div className='w-full'>
                    <div className='w-full text-end'><label className='text-xs'>Required</label></div>
                    <input
                        type="text"
                        name="company"
                        value={taskData.company}
                        onChange={handleChange}
                        placeholder="Company"
                        className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
                    />
                </div>
                <div className='w-full'>
                    <div className='w-full text-end'><label className='text-xs'>Required</label></div>
                    <input
                        type="text"
                        name="job"
                        value={taskData.job}
                        onChange={handleChange}
                        placeholder="Job Title"
                        className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
                    />
                </div>
                <div className='w-full'>
                    <input
                        type='text'
                        name="jobtitle"
                        value={taskData.jobtitle}
                        onChange={handleChange}
                        placeholder="Job Description"
                        className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
                    />
                </div>
                <select
                    name="priority"
                    onChange={handleChange}
                    value={taskData.priority}
                    className="w-full h-12 px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
                >
                    <option value="">Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input
                    type="number"
                    name="deadline"
                    value={taskData.deadline}
                    onChange={handleChange}
                    placeholder="Deadline"
                    className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
                />
                <input
                    type="text"
                    value={tagTitle}
                    onChange={(e) => setTagTitle(e.target.value)}
                    placeholder="Tag Title"
                    className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
                />
                <button
                    className="w-full rounded-md h-9 bg-slate-500 text-amber-50 font-medium"
                    onClick={handleAddTag}
                >
                    Add Tag
                </button>
                <div className="w-full">
                    {taskData.tags && <span>Tags:</span>}
                    {taskData.tags.map((tag, index) => (
                        <div
                            key={index}
                            className="inline-block mx-1 px-[10px] py-[2px] text-[13px] font-medium rounded-md"
                            style={{ backgroundColor: tag.bg, color: tag.text }}
                        >
                            {tag.title}
                        </div>
                    ))}
                </div>
                <div className="w-full flex items-center gap-4 justify-between">
                    <input
                        type="text"
                        name="alt"
                        value={taskData.alt}
                        onChange={handleChange}
                        placeholder="Image Alt"
                        className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        className="w-full"
                    />
                </div>
                <button
                    className="w-full mt-3 rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
                    onClick={handleSubmit}
                >
                    Submit Task
                </button>
            </div>
        </div>
    );
};

export default AddModal;
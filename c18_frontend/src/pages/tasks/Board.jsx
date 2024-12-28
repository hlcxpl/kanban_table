import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Board } from "../../api/data";
import { IoAddOutline } from "react-icons/io5";
import Task from "../../components/tasks/Task";
import AddModal from "../../components/modals/AddModal";
import { onDragEnd } from "../../helpers/onDragEnd";

const Boards = () => {
    const [columns, setColumns] = useState(Board);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState("");

    const openModal = (columnId) => {
        setSelectedColumn(columnId);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleAddTask = (taskData) => {
        const newBoard = { ...columns };
        newBoard[selectedColumn].items.push(taskData);
    };

    return (
        <>
            <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-0 gap-10">
                    {Object.entries(columns).map(([columnId, column]) => (
                        <div
                            className="w-full flex flex-col gap-0 border border-slate-300 "
                            style={{ height: "100vh", overflowY: "auto" }}
                            key={columnId}
                        >
                            <Droppable
                                droppableId={columnId}
                                key={columnId}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5 px-2"
                                    >
                                        <div className="flex items-center justify-center py-[10px] w-full bg-custom-green rounded-lg shadow-sm text-white font-medium text-[15px]">
                                            {column.name}
                                        </div>
                                        {column.items.map((task, index) => (
                                            <Draggable
                                                key={task.id.toString()}
                                                draggableId={task.id.toString()}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <>
                                                        <Task
                                                            provided={provided}
                                                            task={task}
                                                        />
                                                    </>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                        <div
                                            onClick={() => openModal(columnId)}
                                            className="flex cursor-pointer items-center justify-center gap-1 py-[10px] md:w-full w-full  opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
                                        >
                                            <IoAddOutline color={"#555"} />
                                            Add Task
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>

            <AddModal
                isOpen={modalOpen}
                onClose={closeModal}
                setOpen={setModalOpen}
                handleAddTask={handleAddTask}
            />
        </>
    );
};

export default Boards;

import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

type Post = {
    id: number,
    title: string
}

type PostCardProps = {
    post: Post,
    onEdit: (id: number, updatedTitle: string) => void,
    onRemove: (id: number) => void
}

export default function PostCard({ post, onEdit, onRemove }: PostCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(post.title);

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSaveClick = () => {
        if (editedTitle.trim() !== '') {
            onEdit(post.id, editedTitle);
            setIsEditing(false);
        }
    }

    const handleCancelClick = () => {
        setEditedTitle(post.title);
        setIsEditing(false);
    }

    return (
        <Card key={post.id}>
            <Card.Body>
                {isEditing ? (
                    <div>
                        <Form.Control
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <Button variant="success" onClick={handleSaveClick}>
                            Save
                        </Button>
                        <Button variant="danger" onClick={handleCancelClick}>
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Card.Title>{post.title}</Card.Title>
                        <Button variant="primary" onClick={handleEditClick}>
                            Edit
                        </Button>
                        <Button variant="danger" onClick={() => onRemove(post.id)}>
                            Remove
                        </Button>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
}

import React from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface EllipsisButtonProps {
    handleDelete: () => void;
}

export const EllipsisButton = ({ handleDelete }: EllipsisButtonProps): JSX.Element => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="ellipsis-button-menu"
                aria-haspopup="true"
                onClick={handleOpenMenu}
            >
                {/* <MoreHorizIcon /> */}Motherfukcer
            </IconButton>
            <Menu
                id="ellipsis-button-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </div>
    );
};
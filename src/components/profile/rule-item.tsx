import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  alpha,
  styled,
} from "@mui/material";
import { DeleteForeverRounded, UndoRounded } from "@mui/icons-material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface Props {
  type: "prepend" | "original" | "delete" | "append";
  ruleRaw: string;
  onDelete: () => void;
}

export const RuleItem = (props: Props) => {
  let { type, ruleRaw, onDelete } = props;
  const sortable = type === "prepend" || type === "append";
  const rule = ruleRaw.replace(",no-resolve", "").split(",");
  const { attributes, listeners, setNodeRef, transform, transition } = sortable
    ? useSortable({ id: ruleRaw })
    : {
        attributes: {},
        listeners: {},
        setNodeRef: null,
        transform: null,
        transition: null,
      };
  return (
    <ListItem
      dense
      sx={({ palette }) => ({
        background:
          type === "original"
            ? palette.mode === "dark"
              ? alpha(palette.background.paper, 0.3)
              : alpha(palette.grey[400], 0.3)
            : type === "delete"
            ? alpha(palette.error.main, 0.3)
            : alpha(palette.success.main, 0.3),
        height: "100%",
        margin: "8px 0",
        borderRadius: "8px",
        transform: CSS.Transform.toString(transform),
        transition,
      })}
    >
      <ListItemText
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        sx={{ cursor: sortable ? "move" : "" }}
        primary={
          <StyledPrimary
            sx={{ textDecoration: type === "delete" ? "line-through" : "" }}
          >
            {rule.length === 3 ? rule[1] : "-"}
          </StyledPrimary>
        }
        secondary={
          <ListItemTextChild
            sx={{
              width: "62%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "space-between",
              pt: "2px",
            }}
          >
            <Box sx={{ marginTop: "2px" }}>
              <StyledTypeBox>{rule[0]}</StyledTypeBox>
            </Box>
            <StyledSubtitle sx={{ color: "text.secondary" }}>
              {rule.length === 3 ? rule[2] : rule[1]}
            </StyledSubtitle>
          </ListItemTextChild>
        }
        secondaryTypographyProps={{
          sx: {
            display: "flex",
            alignItems: "center",
            color: "#ccc",
          },
        }}
      />
      <IconButton onClick={onDelete}>
        {type === "delete" ? <UndoRounded /> : <DeleteForeverRounded />}
      </IconButton>
    </ListItem>
  );
};

const StyledPrimary = styled("div")`
  font-size: 15px;
  font-weight: 700;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledSubtitle = styled("span")`
  font-size: 13px;
  overflow: hidden;
  color: text.secondary;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ListItemTextChild = styled("span")`
  display: block;
`;

const StyledTypeBox = styled(ListItemTextChild)(({ theme }) => ({
  display: "inline-block",
  border: "1px solid #ccc",
  borderColor: alpha(theme.palette.primary.main, 0.5),
  color: alpha(theme.palette.primary.main, 0.8),
  borderRadius: 4,
  fontSize: 10,
  padding: "0 4px",
  lineHeight: 1.5,
  marginRight: "8px",
}));
"use client";
import React, { useState } from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useGetChannels } from "@/api/channels";

const defaultFormInfo = {
  owner: "codelittinc",
  name: "",
  baseBranch: "master",
  sourceControlType: "github",
  supportsDeploy: false,
  active: true,
  projectId: "",
  jiraProject: "",
  devGroup: "",
  deployChannel: undefined,
  devChannel: undefined,
  feedChannel: undefined,
};

const RepositoryForm = () => {
  const [formData, setFormData] = useState(defaultFormInfo);
  const { data: channels } = useGetChannels();

  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    // Handle form submission
  };

  if (!channels) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems={"center"} justifyContent={"center"}>
        <Grid container spacing={3} xs={6}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Repository
            </Typography>
          </Grid>

          <Grid item xs={4} sm={4}>
            <TextField
              fullWidth
              label="Owner"
              value={formData.owner}
              onChange={(event) => handleChange("owner", event.target.value)}
            />
          </Grid>

          <Grid item xs={8} sm={8}>
            <TextField
              fullWidth
              label="Repository name"
              value={formData.name}
              onChange={(event) => handleChange("name", event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Base branch"
              value={formData.baseBranch}
              onChange={(event) =>
                handleChange("baseBranch", event.target.value)
              }
            />
          </Grid>

          <Grid item xs={6} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.supportsDeploy}
                  onChange={(event) =>
                    handleChange("supportsDeploy", event.target.checked)
                  }
                />
              }
              label="Supports Deploy with Roadrunner"
            />
          </Grid>

          <Grid item xs={6} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.active}
                  onChange={(event) =>
                    handleChange("active", event.target.checked)
                  }
                />
              }
              label={formData.active ? "Active" : "Inactive"}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Source Control Type</FormLabel>
              <RadioGroup
                value={formData.sourceControlType}
                onChange={(event) =>
                  handleChange("sourceControlType", event.target.value)
                }
              >
                <FormControlLabel
                  value="github"
                  control={<Radio />}
                  label="Github"
                />
                <FormControlLabel
                  value="azure"
                  control={<Radio />}
                  label="Azure"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <h5>Project</h5>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <FormLabel>Project</FormLabel>
              <Select
                value={formData.projectId}
                onChange={(event) =>
                  handleChange("projectId", event.target.value)
                }
              >
                <MenuItem value={1}>Project 1</MenuItem>
                <MenuItem value={2}>Project 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Jira project ID:"
              value={formData.jiraProject}
              onChange={(event) =>
                handleChange("jiraProject", event.target.value)
              }
            />
          </Grid>

          <Grid item xs={12}>
            <h5>Slack configuration</h5>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="dev group:"
              value={formData.devGroup}
              onChange={(event) => handleChange("devGroup", event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <FormLabel>deploy channel:</FormLabel>
              <Autocomplete
                options={channels}
                getOptionLabel={(option) =>
                  option ? option["name"] : "Select a channel"
                }
                value={formData.deployChannel}
                onChange={(_, newValue) =>
                  handleChange("deployChannel", newValue)
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>
          </Grid>

          <Grid item sm={12}>
            <FormControl fullWidth>
              <FormLabel>dev channel:</FormLabel>
              <Autocomplete
                options={channels}
                getOptionLabel={(option) =>
                  option ? option["name"] : "Select a channel"
                }
                value={formData.devChannel}
                onChange={(_, newValue) => handleChange("devChannel", newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <FormLabel>feed channel:</FormLabel>
              <Autocomplete
                options={channels}
                getOptionLabel={(option) =>
                  option ? option["name"] : "Select a channel"
                }
                value={formData.feedChannel}
                onChange={(_, newValue) => {
                  console.log(newValue);
                  handleChange("feedChannel", newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default RepositoryForm;

var prefix = '';

const isGithubActions = process.env.GITHUB_ACTIONS || false;

if(isGithubActions)
{
    prefix = 'portfolio';
}

export { prefix };
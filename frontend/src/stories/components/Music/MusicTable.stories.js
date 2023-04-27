import React from 'react';
import MusicTable from 'main/components/Music/MusicTable';
import { musicFixtures } from 'fixtures/musicFixtures';

export default {
    title: 'components/Music/MusicTable',
    component: MusicTable
};

const Template = (args) => {
    return (
        <MusicTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    musics: []
};

export const ThreeSubjectsNoButtons = Template.bind({});

ThreeSubjectsNoButtons.args = {
    musics: musicFixtures.threeMusic,
    showButtons: false
};

export const ThreeSubjectsWithButtons = Template.bind({});
ThreeSubjectsWithButtons.args = {
    musics: musicFixtures.threeMusic,
    showButtons: true
};

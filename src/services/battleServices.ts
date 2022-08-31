import axios from 'axios';
import * as battleRepository from '../repositories/battleRepository.js';

async function getRepos(username: string) {
  const { data } = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );

  return data;
}

async function getFighter(username: string) {
  const fighter = await battleRepository.findFighterByUsername(username);

  if (!fighter) {
    const newFighter = await battleRepository.insertFighter(username);
    return { id: newFighter.id, username, wins: 0, losses: 0, draws: 0 };
  }

  return fighter;
}

function getFighterStarCount(repos: any[]) {
  const repoStars = repos.map((repo) => repo.stargazers_count);
  if (repoStars.length === 0) return 0;

  return repoStars.reduce((current: number, sum: number) => sum + current);
}

async function updateWinnerAndLoserStats(winnerId: number, loserId: number) {
  await battleRepository.updateBattle(winnerId, 'wins');
  await battleRepository.updateBattle(loserId, 'losses');
}

async function updateDrawStats(
  firstFighterId: number,
  secondFighterId: number
) {
  await battleRepository.updateBattle(firstFighterId, 'draws');
  await battleRepository.updateBattle(secondFighterId, 'draws');
}

async function getResult(
  firstFighter: any,
  secondFighter: any,
  firstUserStarCount: number,
  secondUserStarCount: number
) {
  if (firstUserStarCount > secondUserStarCount) {
    await updateWinnerAndLoserStats(firstFighter.id, secondFighter.id);

    return {
      winner: firstFighter.username,
      loser: secondFighter.username,
      draw: false
    };
  }

  if (secondUserStarCount < firstUserStarCount) {
    await updateWinnerAndLoserStats(secondFighter.id, firstFighter.id);
    return {
      winner: secondFighter.username,
      loser: firstFighter.username,
      draw: false
    };
  }

  await updateDrawStats(firstFighter.id, secondFighter.id);
  return { winner: null, loser: null, draw: true };
}

export async function battle(firstUser: string, secondUser: string) {
  const firstUserRepos = await getRepos(firstUser);
  const secondUserRepos = await getRepos(secondUser);

  const firstFighter = await getFighter(firstUser);
  const secondFighter = await getFighter(secondUser);

  const firstUserStarCount = getFighterStarCount(firstUserRepos);
  const secondUserStarCount = getFighterStarCount(secondUserRepos);

  return getResult(
    firstFighter,
    secondFighter,
    firstUserStarCount,
    secondUserStarCount
  );
}

export async function getRanking() {
  return battleRepository.getRanking();
}

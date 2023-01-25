## games

- age_ratings (ArrayField (age_rating_id))
- aggregated_rating (double)
- aggregated_rating_count (int)
- alternative_names (ArrayField (alternative_name_id))
- artworks (ArrayField (artwork_id))
- bundles (ArrayField (game_id))
- category (**ENUM**)
- checksum (uuid)
- collection (foreign key -> Collection)
- cover (foreign key -> Cover)
- created_at (unix timestamp)
- dlcs (ArrayField (game_id))
- expanded_games (ArrayField (game_id))
- expansions (ArrayField (game_id))
- external_games (ArrayField (game_id))
- first_release_date (unix timestamp)
- follows (int)
- forks (ArrayField (game_id))
- franchises (foreign key -> Franchise))
- franchises (ArrayField (franchise_id))
- game_engines (ArrayField (game_engine_id))
- game_localizations (ArrayField (game_localization_id))
- game_modes (ArrayField (game_mode_id))
- genres (ArrayField (genre_id))
- hypes (int)
- involved_companies (ArrayField (involved_company_id))
- keyword (ArrayField (keyword_id))
- language_supports (ArrayField (language_support_id))
- multiplayer_modes (ArrayField (multiplayer_mode_id))
- name (str)
- parent_name (foreign key -> Game)
- platforms (ArrayField (platform_id))
- player_perspectives (ArrayField (player_persoective_id))
- ports (ArrayField (game_id))
- rating (double)
- rating_count (int)
- release_dates (ArrayField (release_date_id))
- remakes (ArrayField (game_id))
- screenshots (ArrayField (screenshot_id))
- similar_games (ArrayField (game_id))
- slug (str)
- standalone_expansions (ArrayField (game_id))
- status (**ENUM**)
- storyline (str)
- summary (str)
- tags (ArrayField (tag_id))
- themes (ArrayField (theme_id))
- total_rating (double)
- total_rating_count (int)
- updated_at (unix timestamp)
- url (str)
- version_parent (foreign key -> Game) 
- version_title (str)
- videos (ArrayField (game_video_id))
- websites (ArrayField (website_id))

```python
categoryEnum = {
  main_game	0
  dlc_addon	1
  expansion	2
  bundle	3
  standalone_expansion	4
  mod	5
  episode	6
  season	7
  remake	8
  remaster	9
  expanded_game	10
  port	11
  fork	12
  pack	13
  update	14
}
```

```python
statusEnum = {
  released	0
  alpha	2
  beta	3
  early_access	4
  offline	5
  cancelled	6
  rumored	7
  delisted	8
}
```

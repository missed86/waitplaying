## characters

- akas (ManyToManyField (str))
- checksum (uuid)
- country_name (str)
- created_at (unix timestamp)
- description (str)
- games (ManyToManyField (game_id))
- gender (**enum**)
- mug_shot (foreign key -> Character_Mug_Shot)
- name (str)
- slug (str)
- species (**enum**)
- updated_at (unix timestamp)
- url (str)


```python
GenderEnum = {
    Male	0
    Female	1
    Other	2
}
```

```python
SpeciesEnum = {
    Human	1
    Alien	2
    Animal	3
    Android	4
    Unknown	5   
}
```
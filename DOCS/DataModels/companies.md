## companies

- change_date (unix timestamp)
- change_date_category (**enum**)
- changed_company_id (foreign key -> Companies)
- checksum (uuid)
- country (integer)
- created_at (unix timestamp)
- description (str)
- developed (ManyToManyField(game_id))
- logo (foreing key -> CompanyLogos)
- name (str)
- parent (foreign key -> Companies)
- published (ManyToManyField(game_id))
- slug (str)
- start_date (unix timestamp)
- start_date_category (**enum**)
- updated_at (unix timestamp)
- url (str)
- websites (ManyToManyField(CompanyWebsite))

```python
change_date_categoryEnum = {
    YYYYMMMMDD	0
    YYYYMMMM	1
    YYYY	    2
    YYYYQ1	    3
    YYYYQ2	    4
    YYYYQ3	    5
    YYYYQ4	    6
    TBD	        7
}
```

```python
start_date_categoryEnum = {
    YYYYMMMMDD	0
    YYYYMMMM	1
    YYYY	    2
    YYYYQ1	    3
    YYYYQ2	    4
    YYYYQ3	    5
    YYYYQ4	    6
    TBD	        7
}
```
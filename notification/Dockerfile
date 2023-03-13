FROM python:3.9

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./ ./

# COPY ./test /code

# CMD ["python3", "main.py", "--proxy-headers"]

# If running behind a proxy like Nginx or Traefik add --proxy-headers
CMD ["uvicorn", "src.main:app", "--reload", "--host", "0.0.0.0", "--port", "80", "--proxy-headers"]
